import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFReport } from "@/components/generate-pdf-report";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { url, metadata } = data;

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      React.createElement(PDFReport, { url, metadata }),
    );

    // Return the PDF as a response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=metadata-report.pdf",
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
