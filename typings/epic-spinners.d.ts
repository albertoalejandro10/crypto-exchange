// typings/epic-spinners.d.ts
declare module 'epic-spinners' {
  import { Component } from 'vue'

  export interface SpinnerProps {
    animationDuration?: number
    size?: number
    color?: string
  }

  export class FlowerSpinner extends Component {
    constructor(props: SpinnerProps)
  }
}
