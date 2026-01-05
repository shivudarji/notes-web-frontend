import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Set all notes (replace existing)
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.error = null;
    },

    // Add a new note
    addNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        description: action.payload.description,
        title: action.payload.title || "Untitled",
        category: action.payload.category || "",
      };
      state.notes.unshift(newNote);
    },

    // Update an existing note
    updateNote: (state, action) => {
      const { _id } = action.payload;

      const noteIndex = state.notes.findIndex((note) => note._id === _id);

      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          ...action.payload,
          category:
            action.payload.category !== undefined
              ? action.payload.category
              : state.notes[noteIndex].category, // Preserve category if not in payload
        };
        // secureLocalStorage.setItem('notes', state.notes);
      }
    },

    // Remove a note
    removeNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
      // secureLocalStorage.setItem('notes', state.notes);
    },

    // Clear all notes
    clearNotes: (state) => {
      state.notes = [];
      // secureLocalStorage.removeItem('notes');
    },
  },
});

export const { setNotes, addNote, updateNote, removeNote, clearNotes } =
  notesSlice.actions;
export default notesSlice.reducer;
