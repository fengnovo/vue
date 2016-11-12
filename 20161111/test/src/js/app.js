var data = { 
	book: { 
		id: 0, 
		author: '', 
		name: '', 
		price: '' 
	}, 
	books: [{ 
		id: 1, 
		author: '曹雪芹', 
		name: '红楼梦', 
		price: 32.0 
	}, { 
		id: 2, 
		author: '施耐庵', 
		name: '水浒传', 
		price: 30.0 
	}, { 
		id: '3', 
		author: '罗贯中', 
		name: '三国演义', 
		price: 24.0 
	}, { 
		id: 4, 
		author: '吴承恩', 
		name: '西游记', 
		price: 20.0 
	}] 
};
var dataStorage = JSON.parse(localStorage.getItem('vue.list.data')) || data;

new Vue({
	el: '#app',
	data: {
		text: '这是一个列表'
	}
});

new Vue({ 
	el: '#content', 
	data: dataStorage,
	methods: {
		addBook: function(){
			this.book.id = this.books.length + 1;
			this.books.push(this.book);
			this.book = { 
				id: 0, 
				author: '', 
				name: '', 
				price: '' 
			};
			localStorage.setItem('vue.list.data',JSON.stringify(dataStorage));
		},
		delBook: function(book){
			var index = this.books.indexOf(book);
			this.books.splice(index, 1);
			localStorage.setItem('vue.list.data',JSON.stringify(dataStorage));
		}
	}
});

var ss;

