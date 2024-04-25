# craft-the-perfect-email-app

import streamlit as st
from imports import *
from prepare import *
from api_calls import *
from webscraper import *
import webbrowser


st.set_page_config(layout="wide")


# Streamlit app
def main():
    st.title("Craft the Perfect Cold Email", anchor='center')

    # Step 1: File upload
    uploaded_file = st.file_uploader("Upload a CSV file", type="csv")

    if uploaded_file is not None:
        # Save the uploaded file
        file_path = "./uploaded_file.csv"
        with open(file_path, "wb") as f:
            f.write(uploaded_file.getvalue())

        # Get the delimiter of the CSV file
        delimiter = get_delimiter(file_path)

        # Create a copy of the uploaded file with "_spintax" added to the name
        copy_file_path = "./uploaded_file_spintax.csv"
        with open(file_path, 'r') as original_file, open(copy_file_path, 'w', newline='') as copy_file:
            reader = csv.reader(original_file, delimiter=delimiter)
            writer = csv.writer(copy_file, delimiter=delimiter)
            writer.writerows(reader)

        # Step 2: Language selection
        language = st.selectbox("Select the language", ("en", "nl", "de"))

        # Step 3: Variable selection
        st.subheader("Select Variables", anchor='center')
        col1, col2 = st.columns([1, 1])

        with col1:
            salutation = st.checkbox("Salutation", value=True)
        with col2:
            subjectline = st.checkbox("Subjectline", value=True)

        col1, col2 = st.columns([1, 1])
        with col1:
            spintax_1 = st.checkbox("Spintax 1", value=True)
        with col2:
            spintax_2 = st.checkbox("Spintax 2", value=True)

        spintax_3 = st.checkbox("Spintax 3", value=True)

        # Spintax configuration
        spintaxes = [
            {"name": "Salutation", "enabled": salutation, "model_key": "salut", "url": "https://docs.google.com/document/d/1axGve9wLTyP7rFUH-naqh0KiAeAXrEHQq5xHH_SSwNY/edit"},
            {"name": "Subjectline", "enabled": subjectline, "model_key": "subjectl", "url": "https://docs.google.com/document/d/1DrFWH8xw1TGixClbi252DDSRvsqo9Kbf0saQBGKiuEs/edit"},
            {"name": "Spintax 1", "enabled": spintax_1, "model_key": "spintax1", "url": "https://docs.google.com/document/d/10nN7uLHIGuIrxQHvhIy2xEDybauS_JgNMG-4_m1ZgIM/edit"},
            {"name": "Spintax 2", "enabled": spintax_2, "model_key": "spintax2", "url": "https://docs.google.com/document/d/1jI68OX_gmiSBqalPbQL-1icaEzErEZ3u4QdrDrfNWV4/edit"},
            {"name": "Spintax 3", "enabled": spintax_3, "model_key": "spintax3", "url": "https://docs.google.com/document/d/1jzGFnbnxyHkja64XraYG62nf87_mRFEs2fOerjl5Znc/edit"}
        ]

        for spintax in spintaxes:
            if spintax["enabled"]:
                with st.container():
                    st.subheader(spintax["name"], anchor='center')
                    col1, col2 = st.columns([1, 1])
                    with col1:
                        ai_provider = st.selectbox(f"AI Provider for {spintax['name']}", ("Claude AI", "OpenAI"))
                        if ai_provider == "Claude AI":
                            model_options = ("claude-3-haiku-20240307", "claude-3-sonnet-20240229", "claude-3-opus-20240229")
                        else:
                            model_options = ("gpt-3.5-turbo-0125", "gpt-4-0125-preview")
                        selected_model = st.selectbox(f"Model for {spintax['name']}", model_options)
                    with col2:
                        if spintax["name"].startswith("Spintax"):
                            sentence = st.text_input(f"Sentence to Fill for {spintax['name']}")
                            spintax["sentence"] = sentence
                        if st.button(f"Open Google Docs for {spintax['name']}", key=f"open_google_docs_{spintax['name']}"):
                            webbrowser.open_new_tab(spintax["url"])
                    systemprompt = st.text_area(f"System Prompt for {spintax['name']}")
                    spintax["selected_model"] = selected_model
                    spintax["systemprompt"] = systemprompt

        if st.button("Process"):
            models = {spintax["model_key"]: spintax["selected_model"] for spintax in spintaxes if spintax["enabled"]}
            prompts = {spintax["model_key"]: spintax["systemprompt"] for spintax in spintaxes if spintax["enabled"]}
            sentences = {spintax["model_key"]: spintax.get("sentence", "") for spintax in spintaxes if spintax["enabled"]}
            get_website(copy_file_path, delimiter) #aquire website from domain email and add to csv
            print(sentences)

            accumulate_info(copy_file_path, delimiter, language, models, prompts, sentences)
            st.success("Processing complete!")

    # Download the processed file
    if os.path.exists("./uploaded_file_spintax.csv"):
        with open("./uploaded_file_spintax.csv", "rb") as f:
            st.download_button("Download Processed File", f, file_name="processed_file.csv")

if __name__ == "__main__":
    main()


above is a python frontend i made. but i want to convert this to js or framework. now convert everything so i get a nice front end. also connect it as much as you can to the backend which is python like done in here as well. 

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/craft-the-perfect-email-app.git
cd craft-the-perfect-email-app
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
