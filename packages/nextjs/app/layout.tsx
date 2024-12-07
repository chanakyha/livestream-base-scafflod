import "@rainbow-me/rainbowkit/styles.css";
import { Header } from "~~/components/Header";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import MainProvider from "~~/components/maincontext";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { Montserrat } from "next/font/google";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className={mont.className}>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>
            <MainProvider>
            <Header />
            {children}
            </MainProvider>
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
