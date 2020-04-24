import React, { useState } from "react";
import axios from "axios";
import { AxiosWithAuth } from '../utils/AxiosWithAuth';
import Axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [colorName, setColorName] = useState('')
  const [colorHex, setColorHex] = useState('000')

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const { id } = colorToEdit;
    AxiosWithAuth().put(`/api/colors/${id}`, {
      ...colorToEdit
    })
      .then(({ data }) => {
        const newColors = [
          ...colors.filter(color => color.id !== id),
          data
        ]
        updateColors(newColors);
      })
      .catch(error => console.log(error));

  };

  const deleteColor = color => {
    console.log(color);
    const { id } = color;
    AxiosWithAuth().delete(`/api/colors/${id}`)
      .then(({ data }) => {
        updateColors([
          ...colors.filter(color => color.id !== id),
        ])
      })
      .catch(error => console.log(error));
  };

  const addColor = e => {
    e.preventDefault();

    if (!colorName || !colorHex || (colorHex.length !== 3 && colorHex.length !== 6)) return;

    AxiosWithAuth().post('/api/colors', {
      color: colorName,
      code: {
        hex: `#${colorHex}`
      }
    })
      .then(({ data }) => {
        updateColors(data);
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <input type='text' placeholder='Color Name' value={colorName} onChange={({ target }) => setColorName(target.value)} />
        <input type='text' placeholder='Color Hex' value={`#${colorHex}`} onChange={({ target }) => setColorHex(target.value.replace("#", ""))} />
        <button type='submit'>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
