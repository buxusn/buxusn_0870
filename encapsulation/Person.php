<?php
/* Здоровье человека не может быть более 100 единиц*/
  class Person{
    private $name;
    private $lastname;
    private $age;
    private $hp;
    private $mother;
    private $father;
    function __construct($name,$lastname,$age,$mother=null,$father=null){
      $this->name=$name;
      $this->lastname=$lastname;
      $this->age=$age;
      $this->mother = $mother;
      $this->father = $father;
      $this->hp = 100;
    }
    function sayHi($name){
      return "Hi $name, my name is ".$this->name;
    }
    function setHp($hp){
      if($this->hp+$hp>=100) $this->hp=100;
      else $this->hp = $this->hp+$hp;
    }
    function getHp(){
      return $this->hp;
    }
    function getName(){
      return $this->name;
    }
    function getMother(){
      return $this->mother;
    }
    function getFather(){
      return $this->father;
    }
 
    function getInfo(){
      return "
      My name is: ".$this->getName()."<br>
      My mother is: ".$this->getMother()->getName()."<br>
      My father is: ".$this->getFather()->getName()."<br>
      My grandfather on my father's side is: ".$this->getFather()->getFather()->getName()."<br>
      My grandmother on my father's side is: ".$this->getFather()->getMother()->getName()."<br>
      My grandfather on my mother's side is: ".$this->getMother()->getFather()->getName()."<br>
      My grandmother on my mother's side is: ".$this->getMother()->getMother()->getName()."";
    }
  }
  $alla = new Person("Alla","Ivanova",69);
  $vlad = new Person("Vlad","Ivanov",70);
  $marina = new Person("Marina","Petrova",66);
  $igor = new Person("Igor","Petrov",68);
  $alex = new Person("Alex","Ivanov",42,$alla,$vlad);
  $olga = new Person("Olga","Ivanova",42,$marina,$igor);
  $valera = new Person("Valera","Ivanov",17,$olga,$alex);
  echo $valera->getInfo();
  
?>
