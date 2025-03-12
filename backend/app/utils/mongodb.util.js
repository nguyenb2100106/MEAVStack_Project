// const { MongoClient } = require("mongodb");

// class MongoDB {
//   static connect = async (uri) => {
//     if (this.client) return this.client;
//     this.client = await MongoClient.connect(uri);
//     return this.client;
//   };
// }

// module.exports = MongoDB;
const { MongoClient } = require("mongodb");

class MongoDB {
  static client;

  static async connect(uri) {
    if (!this.client) {
      this.client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await this.client.connect();
      console.log("Connected to MongoDB");
    }
    return this.client;
  }
}

module.exports = MongoDB;
