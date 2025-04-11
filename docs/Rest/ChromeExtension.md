# Create a Crome Extension

You need 4 files: 
- manifest.json (most important) 
- index.html (the GUI to interact with extension) 
- script.js (script in the Extension pop up for comunication) 
- injected.js (edditing the webpage)

### manifest.json
```json
{
  "name": "Colored Calender",
  "version": "1.2",
  "description": "Colores the background of specific days in your google calender.",
  "manifest_version": 3,
  "permissions": ["scripting", "activeTab","tabs", "storage"],
  "action": {
    "default_popup": "index.html",
    "default_title": "myExtension"
  },
  "host_permission": ["https://calendar.google.com/*"],
  "content_scripts": [
    {
      "matches": ["https://calendar.google.com/*"],
      "js": ["inject.js"]
    }
  ]
,"content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self';",
    "sandbox": "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
  }
}
```

### index.html
```html
<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"> <!-- Very important -->
<script type="text/javascript" src="script.js">
        
<div id="add">
    <form id="form">
        Von: <input type="date" id="inp1"> <br>
        Bis: <input type="date" id="inp2"> <br>
        Color: <input type="text" maxlength="3"  id="inp3"> <br>
        <button  id="submit">+</button>
    </form>
</div>
```

### script.js
```javascript
document.onreadystatechange = () => { // only when loaded. Otherwise you get an error, when you try to interact with elements, that dont exist
    if (document.readyState === 'complete') {
    
        //Add a Date
        document.getElementById("submit").addEventListener("click", (e) => {
            chrome.storage.sync.get(["inputs"], (result) => {       // async syncronise cookies
                chrome.storage.sync.set({"inputs": 
                result["inputs"].concat([[
                    document.getElementById("inp1").value, 
                    document.getElementById("inp2").value, 
                    document.getElementById("inp3").value
                ]])})
            })
        })
    }
}
```

### injected.js
```javascript
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        // Store data in sync storage
        chrome.storage.sync.set({"inputs": [['2023-07-27', '2023-08-31', 'cfc'], ['2023-09-5', '2023-09-30', 'cfc'], ['2023-10-01', '2024-01-07', 'fcc']]});




        // read all Dates on change cookies
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area == "sync") {
                ...
            }
        })
    }
};
```