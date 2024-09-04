import { NextRequest, NextResponse } from 'next/server';
import { getUserCollection } from 'lib/mongodb/mongodb';
import { createEthWallet, createTronWallet } from 'components/blockchain/generateWallet';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, network } = body;

    if (!walletAddress || !network) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const users = await getUserCollection();
    const existingUser = await users.findOne({ walletAddress, network });

    if (existingUser) {
      return NextResponse.json({ depositAddress: existingUser.depositAddress, userId: existingUser._id });
    }

    let depositAddress = "";

    if (network === "ERC20") {
      const { address } = await createEthWallet(); // 生成以太坊地址
      depositAddress = address;
    } else if (network === "TRC20") {
      const { address } = await createTronWallet(); // 生成Tron地址
      depositAddress = address;
    } else {
      return NextResponse.json({ message: 'Unsupported network' }, { status: 400 });
    }

    const result = await users.insertOne({
      walletAddress,
      depositAddress,
      network,
      createdAt: new Date(),
    });

    return NextResponse.json({ depositAddress, userId: result.insertedId }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
