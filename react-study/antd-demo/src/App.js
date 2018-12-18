import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header.jsx'
import Main from './components/main/Main.jsx'
import Footer from './components/footer/Footer.jsx'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;