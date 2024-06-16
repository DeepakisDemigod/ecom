class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i'
          }
        }
      : {};
      
    console.log('Search keyword:', this.queryStr.keyword || 'No keyword provided');
    console.log('Constructed query:', keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }
}

module.exports = ApiFeatures;
