import { NextRequest, NextResponse } from "next/server";
import React from "react";

// Set to edge runtime for better performance
export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { url, metadata } = data;

    // Dynamically import PDF renderer only when needed
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const { PDFReport } = await import("@/components/generate-pdf-report");

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      React.createElement(PDFReport, { url, metadata }),
    );

    // Return the PDF as a response with caching headers
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=metadata-report.pdf",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
