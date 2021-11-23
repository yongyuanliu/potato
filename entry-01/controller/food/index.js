class Food{
    constructor(caption, head, data, foot){
      this.caption = caption;
      this.head = head;
      this.data = data;
      this.foot = foot;
      this.nice = false;
    }
    nice(){
      this.nice = true;
    }
  }
  
  export default Food;
  