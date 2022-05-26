import { Component } from "react";

export class Heading extends Component {
  render() {
    return (
      <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
        <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span class="relative text-white px-6">Todo App</span>
        </span>
      </blockquote>
    );
  }
}
