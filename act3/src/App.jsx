import { useState } from 'react'
import axios from 'axios'

function App() {
  const [textField1, setTextField1] = useState('')
  const [textField2, setTextField2] = useState('')
  const [textField3, setTextField3] = useState('')
  const [textField4, setTextField4] = useState('')
  const [textarea, setTextarea] = useState('')
  const [dropdown, setDropdown] = useState('')
  
  const handleTextField1Change = (event) => {
    setTextField1(event.target.value)
  }
  
  const handleTextField2Change = (event) => {
    setTextField2(event.target.value)
  }

  const handleTextField3Change = (event) => {
  setTextField3(event.target.value)
  }
  
  const handleTextField4Change = (event) => {
  setTextField4(event.target.value)
  }

  
  const handleTextareaChange = (event) => {
    setTextarea(event.target.value)
  }
  
  const handleDropdownChange = (event) => {
    setDropdown(event.target.value)
  }
  
 const handleSubmit = async () => {
   // Basic input validation
   if (!textField1 || !textField2 || !dropdown || !textField3 || !textField4) {
     alert("Please fill in all fields.");
     return;
   }

   const productData = {
     ProductID: parseInt(textField1, 10), // Convert to integer
     ProductName: textField2,
     Category: dropdown,
     Description: textarea,
     UnitPrice: parseFloat(textField3), // Convert to float
     StockQuantity: parseInt(textField4, 10), // Convert to integer
   };

   try {
     const response = await axios.post(
       "http://localhost:8000/addproduct",
       productData
     );

     if (response.status === 200) {
       // Success
       console.log(response.data);
       // Reset form fields
       setTextField1("");
       setTextField2("");
       setTextField3("");
       setTextField4("");
       setTextarea("");
       setDropdown("null");
       // ... (rest of your fields)

       alert("Product added successfully!");
     } else {
       console.error("Error adding product:", response);
       alert("Failed to add product. Please check server logs.");
     }
   } catch (error) {
     console.error("Error during request:", error);
     alert("An error occurred. Please try again later.");
   }  
 };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <label htmlFor="productId">Product ID:</label>
        <br />
        <input type="text" id="productId" value={textField1} onChange={handleTextField1Change} className="border border-gray-300 rounded-md p-2 mb-2" />
        <br />
        <label htmlFor="productName">Product Name:</label>
        <br />
        <input type="text" id="productName" value={textField2} onChange={handleTextField2Change} className="border border-gray-300 rounded-md p-2 mb-2" />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea id="description" value={textarea} onChange={handleTextareaChange} className="border border-gray-300 rounded-md p-2 mb-2" />
        <br />
        <label htmlFor="category">Category:</label>
        <br />
        <select id="category" value={dropdown} onChange={handleDropdownChange} className="border border-gray-300 rounded-md p-2 mb-2">
          <option value="null">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Appliances">Appliances</option>
          <option value="Apparel">Apparel</option>
          <option value="Accessories">Accessories</option>
        </select>
        <br />
        <label htmlFor="unitPrice">Unit Price:</label>
        <br />
        <input type="text" id="unitPrice" value={textField3} onChange={handleTextField3Change} className="border border-gray-300 rounded-md p-2 mb-2" />
        <br />
        <label htmlFor="quantity">Quantity:</label>
        <br />
        <input type="text" id="quantity" value={textField4} onChange={handleTextField4Change} className="border border-gray-300 rounded-md p-2 mb-2" />
        <br />
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </div>
    </div>
  )
}


export default App
