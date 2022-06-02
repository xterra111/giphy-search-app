import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";



export default function Home ( initialData ) {
	
	// usestate for form input change

	const [searchInput, setSearchInput] = useState( {} );
	const [searchResults, setSearchResults] = useState( [] );
	const [searchQuery, setSearchQuery] = useState( "trending" );
	
	
	// useeffect for form input change
	
	useEffect( () => {
		setSearchResults (initialData.trendingGifsFetched.data)
	}, [initialData]);

	// handle change for form input
	const handleChange = ( e ) => {
		
		let searchValue = e.target.value;
		
		setSearchInput( searchValue );
		
	};


// prevent Default for form submit
	const searchGifs = async ( e ) => {
		e.preventDefault();
		console.log(searchInput);
		let searchedGif = await fetch( `https://api.giphy.com/v1/gifs/search?api_key=lefl9UYzNJB4kWJr130Z2baInXi43RjF&q=${searchInput}&limit=5&offset=0&rating=G&lang=en` );
		const searchedGifResult = await searchedGif.json();
		console.log(searchedGifResult);
		setSearchResults( searchedGifResult.data );
		setSearchQuery( searchInput );

	};



	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />

			</Head>
			<h1>Giphy App</h1>

			<form onSubmit={searchGifs}>
				<input onChange={handleChange} type="text" placeholder="Search for a gif" />
				<button>Search</button>
			</form>

			<h1>Search results for the term: {searchQuery}</h1>

			<p> Share this search  

				<Link href={`/search/${searchQuery}`}>
					<a> {searchQuery}</a>
				</Link>



			</p>

			<div className='results-grid'>
			{searchResults.map( ( item, index ) => {
				return (
					<div key={index}>
						
						<img src={item.images.original.url} />
						{/* Need to research is image is better for NextJS */}

						<h3>{item.title}</h3>
					</div>

				)
			} )}
				</div>
		

		</div>
	)
}

export async function getServerSideProps () {
	// limiting the number of results to 5
	let trendingGifs = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=lefl9UYzNJB4kWJr130Z2baInXi43RjF&limit=5')
	  const trendingGifsFetched = await trendingGifs.json();
	
	return {
		props: {
			trendingGifsFetched: trendingGifsFetched
		} 

	}
}

// Try StaticProps to see how it works. 
// export async function getStaticProps () {
// 	// limiting the number of results to 5
// 	let trendingGifs = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=lefl9UYzNJB4kWJr130Z2baInXi43RjF&limit=5')
// 	  const trendingGifsFetched = await trendingGifs.json();
	
// 	return {
// 		props: {
// 			trendingGifsFetched: trendingGifsFetched
// 		} 

// 	}
// }
