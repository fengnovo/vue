const STORAGE_KEY = 'webpack-es6-vue-todolist';
export default {
	fetch (){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
	},
	save (items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items));
	}
}