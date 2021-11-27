import React from "react";

function ImgUpload() {
  return (
    <div className="ImgUpload">
      <label>Say something:</label>
      <input type="text" />
      <input type="file" />
      <label for="pet-select">Choose a tage for your animal:</label>

      <select name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="squirrel">Squirrel</option>
        <option value="bird">Bird</option>
        <option value="bunny">Bunny</option>
        <option value="others">Others</option>
      </select>
      <button>Submit</button>
    </div>
  );
}
export default ImgUpload;
