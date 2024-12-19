import { Transaction, connectDB } from "@/backend/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10); // Default 20 items per page
    const search = url.searchParams.get("search") || "";

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Build the search query
    const query = search
      ? {
          $or: [
            { from: { $regex: search, $options: "i" } },
            { to: { $regex: search, $options: "i" } },
            { signature: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch data with pagination and sorting
    const transactions = await Transaction.find(query)
      .sort({ blockTime: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Fetch the total count for the query
    const total = await Transaction.countDocuments(query);

    // Respond with paginated data
    return NextResponse.json({
      data: transactions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
}
