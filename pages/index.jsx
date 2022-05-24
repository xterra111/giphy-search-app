import Head from "next/head";
import { useEffect } from "react";


export default function Home (initialData) {
	
	useEffect( () => {
		console.log( initialData );
	});

	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />

			</Head>
			<h1>Giphy App</h1>
			<div className='results-grid'>
			{initialData.trendingGifsFetched.data.map( ( item, index ) => {
				return (
					<div key={index}>
						<h3>{item.title}</h3>
						<img src={item.images.original.url} />
						{/* Need to research is image is better for NextJS */}
					</div>

				)
			} )}
				</div>
		

		</div>
	)
}

export async function getStaticProps() {
	const trendingGifs = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=XXX&limit=5')
	 const trendingGifsFetched = await trendingGifs.json();
	
	return {
		props: {
			trendingGifsFetched: trendingGifsFetched
		}
	}
}
