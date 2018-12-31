<template>
  <div class="container">
    <ul class="letter-list">
        <!-- want to give .letter-list grid layout 12 columns  -->
        <WordList v-for="(value, key) in words" v-if="value.length > 0" v-bind:list="value" v-bind:letter="key"></WordList>
     </ul>
    <div>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
<style lang="scss">
  .container {
    padding: 4.096rem 2.56rem;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-row-gap: 4rem;
  }

  .letter-list {
    font-size: 1rem;
    font-weight: 400;
    font-family: "Acumin";
    padding: 0;
    margin: 0;
    grid-column: span 10;
    grid-gap: 1rem;
  }

  .modal {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 9998;
    top: 0;
    right: 0;
    width: 38.2%;
    height: 100%;
    background-color: #fff;
    box-shadow: -2px 2px 3px rgba(0, 0, 0, .33);
    transition: opacity .3s ease;
    padding: 4.096rem 2.56rem;

    button {
      position: fixed;
      bottom: 1.6rem;
      font-size: 1rem;
      background: none;
    }
    button:hover {
      cursor: pointer;
    }
  }
</style>
<script>
import WordList from '@/components/WordList'
import WordContainer from '@/components/WordContainer'
let db;

export default {
  name: 'Main',
  components: {
    WordList,
    WordContainer,
  },
  props: ['words'],
  mounted() {
    let request = window.indexedDB.open('words', 1);
    const displayWordGraph = this.displayWordGraph.bind(this);

    request.onerror = function() {
      console.log('Database failed to open');
    };

    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function() {
      console.log('Database opened successfully');

      // Store the opened database object in the db variable. This is used a lot below
      db = request.result;

      // Run the displayData() function to display the words already in the IDB
      displayWordGraph();
    };

    request.onupgradeneeded = function(e) {
      // Grab a reference to the opened database
      let db = e.target.result;

      // Create an objectStore to store our words in (basically like a single table)
      // including a auto-incrementing key
      let objectStore = db.createObjectStore('words', { keyPath: 'id', autoIncrement:true });

      // Define what data items the objectStore will contain
      objectStore.createIndex('name', 'name', { unique: true });
      objectStore.createIndex('gender', 'gender', { unique: false });

      console.log('Database setup complete');
    };
  },
  methods: {
    showWordSet(word, gender){
      // const displayWordGraph = this.displayWordGraph.bind(this);
      // // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
      // console.log(word);
      // let newItem = { 'name': word, 'gender': gender };
      // console.log(newItem);
      // // open a read/write db transaction, ready for adding the data
      // let transaction = db.transaction(['words'], 'readwrite');

      // // call an object store that's already been added to the database
      // let objectStore = transaction.objectStore('words');

      // // Make a request to add our newItem object to the object store
      // var request = objectStore.add(newItem);

      // // Report on the success of the transaction completing, when everything is done
      // transaction.oncomplete = function() {
      //   console.log('Transaction completed: database modification finished.');

      //   // update the display of data to show the newly added item, by running displayData() again.
      //   displayWordGraph();
      // };

      // transaction.onerror = function() {
      //   console.log('Transaction not opened due to error');
      // };
    },
    displayWordGraph() {
      let objectStore = db.transaction('words').objectStore('words');
      if ('getAll' in objectStore) {
        // IDBObjectStore.getAll() will return the full set of items in our store.
        objectStore.getAll().onsuccess = function(event) {
          console.log(event.target.result);
        };
      } else {
        // Fallback to the traditional cursor approach if getAll isn't supported.
        var words = [];
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
            words.push(cursor.value);
            cursor.continue();
          } else {
            console.log(words);
          }
        };
      }
    }
  }
};
</script>
