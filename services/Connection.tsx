export const Connection = {
	applicationEndPoint: "https://portal.ktls.edu.hk/api.php",

	sendApplication(data: Record<string, string|boolean|null>) {
		console.log('submit');

		this.postData(this.applicationEndPoint, data);
	},

	postData: async (url: string, data: Record<string, string|boolean|null>): Promise<void> => {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});
		
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		
			const result = await response.json();
			console.log("Success:", result);
		} 
		catch (error) {
			console.error("Error:", error);
		}
	}

}