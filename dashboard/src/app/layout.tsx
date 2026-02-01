import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
    title: "Behavioral Profiling | Psychographic Engine",
    description: "Behavioral profiling and attribution dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${mono.variable} ${mono.className} antialiased font-mono`}>{children}</body>
        </html>
    );
}
