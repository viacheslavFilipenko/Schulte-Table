import React from 'react';
import './App.css';
import {RecoilRoot} from "recoil";
import {SchulteTable} from "./components/SchulteTable/SchulteTable";
import {Settings} from "./components/SchulteTable/Settings/Settings";
import {TestResult} from "./components/SchulteTable/TestResult/TestResult";

function App() {

  return (
   <RecoilRoot>
     <TestResult />
     <Settings />
     <SchulteTable />
   </RecoilRoot>
  );
}

export default App;
