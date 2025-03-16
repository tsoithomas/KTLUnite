type CallbackFunction = (data: UserData) => void;
type UserData = {
	accountId: number;
	name: string;
	memberSince: number;
};

export const Connection = {
	apiEndPoint: "https://portal.ktls.edu.hk/api.php?action=", 

	sendApplication(data: Record<string, any>) {
		console.log('submit');

		this.postData('alumniRegister', data);
	},

	async login(data: Record<string, any>, callback: CallbackFunction) {
		console.log('login');

		let result = await this.postData('alumniLogin', data);

		if (result.success) {
			let data: UserData = {
				accountId: result.accountId,
				name: result.name,
				memberSince: result.memberSince,
			}

			callback(data);
		}
		else {

			console.log(result);
		}
	},

	async postData(action: string, data: Record<string, any>): Promise<any> {
		try {
			const response = await fetch(this.apiEndPoint+action, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});
		
			// if (!response.ok) {
			// 	throw new Error(`HTTP error! Status: ${response.status}`);
			// }
		
			const result = await response.json();
			return result;
		}
		catch (error) {
			console.error("Error:", error);
		}
	}

}