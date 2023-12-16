import styles from "./App.module.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { postsApi } from "./features/posts";
import { Nav } from "./components/Nav/Nav";
import { Posts } from "./components/Posts/Posts";
// TODO split app into pages: posts, users, me

function App() {
  return (
    <ApiProvider api={postsApi}>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.main}>
        {/* <Modal /> */}
        <Posts />
      </main>
    </ApiProvider>
  );
}

export default App;
