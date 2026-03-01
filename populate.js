// List of all run folders (you'll need to update this list)
const runFolders = [
  'run_20260301_195306',
  'run_20260301_200305',
  'run_20260301_201702',
  'run_20260301_202738',
  'run_20260301_204132',
  'run_20260301_205158',
  // Add more folder names here
];

// Load all runs and populate table
async function populateTable() {
  const tbody = document.querySelector('#rich-captions tbody');
  tbody.innerHTML = '';
  
  // Process each folder
  for (const folder of runFolders) {
    try {
      // Load the params.json from this folder
      const response = await fetch(`${folder}/params.json`);
      const data = await response.json();
      
      const prompts = data.prompt_list;
      
      // Convert prompt to filename
      function toFilename(prompt) {
        return prompt.replace(/[\s-]+/g, '_') + '.wav';
      }
      
      // Add a row for each prompt in this folder
      prompts.forEach(prompt => {
        const audioFile = `${folder}/${toFilename(prompt)}`;
        
        const row = `
          <tr style="height: 120px;">
            <td>${prompt}</td>
            <td style="text-align: right;">
              <audio class="px-1" controls="">
                <source src="${audioFile}" type="audio/wav">
                Your browser does not support the audio element.
              </audio>
            </td>
          </tr>
        `;
        
        tbody.innerHTML += row;
      });
    } catch (error) {
      console.error(`Error loading folder ${folder}:`, error);
    }
  }
}

// Run when page loads
populateTable();