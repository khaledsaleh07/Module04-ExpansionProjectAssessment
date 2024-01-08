// Ex:1
// Bubble sort Implementation using Javascript
 
// Creating the bblSort function
// function bblSort(arr) {
 
//     for (var i = 0; i < arr.length; i++) {
 
//         // Last i elements are already in place  
//         for (var j = 0; j < (arr.length - i - 1); j++) {
 
//             // Checking if the item at present iteration 
//             // is greater than the next iteration
//             if (arr[j] > arr[j + 1]) {
 
//                 // If the condition is true
//                 // then swap them
//                 var temp = arr[j]
//                 arr[j] = arr[j + 1]
//                 arr[j + 1] = temp
//             }
//         }
//     }
 
//     // Print the sorted array
//     console.log(arr);
// }

// bblSort([4, 1, 3, 9, 7]);

// Ex:2 
// const binarySearch = (a, e) => {

//     let start = 0;
//     let end = a.length - 1;
//     while(start <= end) {
//         let mid = Math.floor((start+end)/2);
//         if(a[mid] === e) {
//             return mid;
//         }
//         else {
//             if(a[mid] < e){
//                 start = mid + 1;
//             }
//             else {
//                 end = mid - 1;
//             }
//         }
//         return -1;
//     }

// }

//Ex 3:
// Define the Node class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Define the LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
    }

    // Append function to add nodes to the end of the linked list
    append(data) {
        const newNode = new Node(data);
        
        // If the list is empty, make the new node as the head
        if (!this.head) {
            this.head = newNode;
            return;
        }

        // Traverse to the end of the list
        let current = this.head;
        while (current.next) {
            current = current.next;
        }

        // Add the new node to the end
        current.next = newNode;
    }

    // Remove function to remove nodes with a specific value
    remove(data) {
        if (!this.head) return;

        // If the head node has the data, move the head
        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        let prev = null;

        while (current) {
            if (current.data === data) {
                prev.next = current.next;
                return;
            }
            prev = current;
            current = current.next;
        }
    }

    // Display function to display the elements of the linked list
    display() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}