import { Inter } from "next/font/google";
import "./globals.css";
import Hotjar from "@hotjar/browser";
import Script from "next/script";
import Scrollup from "@/components/Layout/Scrollup";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Balaji AirVent | Premium HVAC Solutions & AirVentilation Systems",
    template: "%s | Balaji AirVent"
  },
  description: "Leading manufacturer of premium HVAC solutions, AirVentilation systems, and industrial air handling equipment. Expert engineering, quality products, and reliable service across India.",
  keywords: [
    "Balaji AirVent",
    "HVAC Solutions",
    "AirVentilation Systems",
    "Industrial Air Handling",
    "Air Conditioning Equipment",
    "Ventilation Fans",
    "Air Ducts",
    "HVAC Manufacturing",
    "Industrial Ventilation",
    "Air Quality Solutions",
    "Commercial HVAC",
    "Residential HVAC"
  ],
  authors: [{ name: "Balaji AirVent" }],
  creator: "Balaji AirVent",
  publisher: "Balaji AirVent",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://balajiairvent.com",
    siteName: "Balaji AirVent",
    title: "Balaji AirVent | Premium HVAC Solutions & AirVentilation Systems",
    description: "Leading manufacturer of premium HVAC solutions, AirVentilation systems, and industrial air handling equipment. Expert engineering, quality products, and reliable service across India.",
    images: [
      {
        url: "/asset/favicon_balaji.png",
        width: 1200,
        height: 630,
        alt: "Balaji AirVent - Premium HVAC Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji AirVent | Premium HVAC Solutions & AirVentilation Systems",
    description: "Leading manufacturer of premium HVAC solutions, AirVentilation systems, and industrial air handling equipment.",
    images: ["/asset/favicon_balaji.png"],
  },
  alternates: {
    canonical: "https://balajiairvent.com",
  },
  icons: {
    icon: [
      { url: "/asset/favicon_balaji.ico", sizes: "any" },
      { url: "/asset/favicon_balaji.png", type: "image/png" }
    ],
    shortcut: "/asset/favicon_balaji.ico",
    apple: "/asset/favicon_balaji.png",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      {/* <Script id="HotJarAnalytics" >
      {
        `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5292476,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`}
      
     </Script>
    

      <link rel="icon" href="./favicon.png" sizes="any" />
      <link
  rel="apple-touch-icon"
  href="./favicon.png"
  type="image/png"
  sizes="any"
    /> */}
      <body className={inter.className}>{children}
        
      </body>

    </html>
  );
}
