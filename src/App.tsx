import "./App.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { postsApi } from "./features/posts";
import { Posts } from "./components/Posts/Posts";
// TODO split app into pages: posts, users, me

function App() {
  return (
    // <Provider store={store}>
    <ApiProvider api={postsApi}>
      <main>
        <Posts />
      </main>
    </ApiProvider>
    // </Provider>
  );
}

export default App;
