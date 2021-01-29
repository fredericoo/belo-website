import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		const GA_TRACKING_ID = "G-NXZQEY4YQP";
		return (
			<Html>
				<Head>
					{/* PRELOADING */}
					<link
						rel="preload"
						href="/fonts/fakt/364db368710f5fb837ef8418c6d51df3e3027bfb.woff2"
						as="font"
					/>
					<link
						rel="preload"
						href="/fonts/fakt/7071de2dc925341ccc839e2d8a7dea79820800b3.woff2"
						as="font"
					/>

					{/* TRACKING */}
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-NXZQEY4YQP"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
