import { useState, useEffect } from "react";
import { Expense } from "@/app/types/expense";
import List from "@/app/components/displayLayouts/list";

//receives setSearch useState function to allow updating if the user closes the lightroom to searhc expenses
export default function Search({ stateChange }: { stateChange: (state: boolean) => void }) {
	//This stores the input data as the user types away. only collects expense name and checked bbox categoires to send to mongodb to search if applicable
	const [searchData, setSearchData] = useState<{ name: string; category: string[] }>({
		name: "", //expense name
		category: []//expense category type (technology, home, etc)
	});

	// this is what will be used for UI display purposes from the api call to mongodb
	const [searchResult, setResults] = useState<Expense[]>([]);

	// this stores the category count dictionary
	const [categories, setCategories] = useState<{ [key: string]: number }>({});

	// utilize from add expense form to track when user types into the search bar
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setSearchData(prev => ({ ...prev, [name]: value })); //renews expense name when user completes their word
	};

	// this is specifically catered toward the checkboxes to track if it checked or not. following similar formatting to previous handler.
	// https://stackoverflow.com/questions/77795914/filtering-data-based-on-category-in-react-functional-component -- helped understand how to manage when checkbox how to update values
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;
		if (checked) {
			// prev = current state |  name is the name="category from input field" | value is what is set to or equaling to. ...prev gathers all previous data to create array
			setSearchData(prev => ({ ...prev, [name]: [...prev.category, value]})) //this allows for an array of category. appending each checked box
		} else {
			setSearchData(prev => ({ ...prev, [name]: prev.category.filter(unchecked => unchecked !== value)})); // this finds unchecked boxes and removes them from the searchData array
		}
	};

	// https://github.com/vercel/next.js/discussions/47072 : helped ensure my asumption about formatting the url properly
	//also used handletSubmit function in edit page as a base
	const searchExpense = async () => {
		//sets endpoint to search api for mongodb
		const baseURL = "/api/search"

		//creating separate collectors of respetive queries for cleanliness
		const categoryQuery: string[] = [];
		let expenseNameQuery: string = ""

		//query request collection
		const searchQuery = [];

		// This is the case where if the search bar is not empty then it will be added to the query builder array
		// Since this is the first checker if it is empty or not, this order allows for it to start at the beginnning every time there is search bar query as seen in most standard url query in my experience
		if (searchData.name !== "") {
			expenseNameQuery = `?expenseName=${searchData.name}`
			searchQuery.push(expenseNameQuery);
		}  

		// this is the case where the user does not add to the search bar first.
		//  I noted that a query should always start with a ? and the following would be &. 
		// This also allows for recreate the url whenever new query is added dynamically
		searchData.category.forEach((category, index) => {
			if (searchQuery.length === 0 && index === 0) { //starting query if no search bar query
				categoryQuery.push(`?category=${category}` )
			} else { // following query if the array query is not empty
				categoryQuery.push(`&category=${category}`)
			}
		});
		
		// this copies and adds optional/additionally query to always follow suit the searhc bar query if exist adn removes commas for proper formatting
		searchQuery.push([...categoryQuery].join(""));
		
		//this put all the request all together and removes potential commas when combining indexes
		const url = `${baseURL}${searchQuery.join("")}`

		//this makes the request over to /api/search to act as a search engine through mongodb where it does some backend queries
		const response = await fetch(url, {
			method: "GET",
		});

		// sets the list of items that match the query from the input request
		const expense = await response.json();
		setResults(expense); // sets the expense data
	}

	useEffect(() => {
		//start mongodb search preparation and execution
		searchExpense();
	  }, [searchData.name, searchData.category]); // gets recalled whenever user types or selects another/removes category checkbox


	// this is for the Checkboxes UI to get all categories and counts baseline
	const getCategories = async () => {
		const response = await fetch(`/api/expenses/`, {
			method: "GET",
		});
		// sets the list of items that match the query from the input request
		const getExpenses = await response.json();

		//only includes category fields, for ease of use and limit unneccary request of unrelated data
		const expensesCategory: string[] = getExpenses.expenses.map((expense: Expense) => expense.category);
		
		// counting up category and setting the  count for the categories
		const categoryDict: {[key: string]: number} = {}
		expensesCategory.forEach((expenseItem: string) => {
			//sees whether the key exist, if so it add to the key's value count
			if (categoryDict[expenseItem ]) {
				categoryDict[expenseItem] += 1;
			} else { // if its new category then it'll start the count
				categoryDict[expenseItem] = 1;
			}
		}); 
		setCategories(categoryDict);
	}

	// this function purpose is to calllthis once when the search lighthouse is opened by the user otherwise loop of terror
	useEffect(() => {
		getCategories()
	}, [searchData.category])

	return (
	  	<div className="fixed inset-0 flex justify-center items-center bg-indigo-200/70">
			<div className="flex w-[90%] h-[90%] bg-white text-black flex-col rounded-lg shadow-lg p-5 border-2">
				<div className="w-full flex justify-between mt-5 items-center">
			  		<h2 className="text-2xl sm:text-3xl font-bold">Find an Expense</h2>
					{/*Exit button to remove the lightouse search*/}
					<button className="text-black text-3xl font-bold" onClick={() => stateChange(false)}>
						&times;
					</button>
				</div>
				<section className="mt-5 space-y-4">
					<input className="border-2 border-black rounded-lg p-4 w-full"
						type="text" 
						placeholder="Search for expense..." 
						onChange={handleChange}
						id="name"
						name="name"
						value={searchData.name || ''}
					/>
					<div className="gap-2 overflow-auto flex flex-row w-full h-auto">
						{(
							Object.entries(categories).map(([category, count]) => (
								<label key={category} className="w-min-content p-3 rounded-lg space-x-2 flex bg-indigo-600 text-white items-center shadow-md">
									<input type="checkbox"
										name="category" 
										id={category} 
										value={category} 
										onChange={handleCheckboxChange}
										checked={(searchData.category as string[]).includes(category)}
									/>
									<span>{category}</span>
									<span>({count})</span>
								</label>
							))
						)}
					</div>
				</section>
				<section className="mt-8 overflow-y-auto">
					{ /*When the array is empty itll show a blank, but if there at least one index itll display the results it found from mongodb*/
						searchResult && searchResult.length > 0  
							? ( <List key={0} expenses={searchResult} /> )
							: ( <div className="text-center flex justify-center items-center">No Expenses Listed...</div> )
					}
				</section>
		  </div>
	  </div>
	);
  }