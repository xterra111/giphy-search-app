import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";


const searchQuery = (initialData) => {
    const router = useRouter();
    return (
      
        <div>
            <Head>
                <title>Search Gifs</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" />
            </Head>
            <p> Go back to <Link href="/"><a>Home</a></Link></p>
            <h1>Search Gif results for: {router.query.searchQuery}</h1>
            
            <div className='results-grid'>
			{initialData.routedGifsFetched.data.map( ( fetcheditem, index ) => {
				return (
					<div key={index}>
						
						<img src={fetcheditem.images.original.url} />
						{/* Need to research is image is better for NextJS */}

						<h3>{fetcheditem.title}</h3>
					</div>

				)
			} )}
				</div>

        </div>
    )
};
export default searchQuery;

export async function getServerSideProps ( context ) {
    
    const routedsearchQuery = context.query.searchQuery;

	// limiting the number of results to 5
    
    
    let routedGifs = await fetch( `https://api.giphy.com/v1/gifs/search?api_key=lefl9UYzNJB4kWJr130Z2baInXi43RjF&q=${routedsearchQuery}&limit=5&offset=0&rating=G&lang=en` );

	  const routedGifsFetched = await routedGifs.json();
	
	return {
		props: {
			routedGifsFetched: routedGifsFetched
		} 

	}
}

