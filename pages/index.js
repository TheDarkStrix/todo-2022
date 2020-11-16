import Head from "next/head";
import { Heading } from "../components/heading/heading";
import Notes from "../components/notes/notes";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Notes />
    </div>
  );
}
