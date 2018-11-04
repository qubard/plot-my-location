var socket = io();

var loadedAgents = null;

socket.on('agents', (agents) => {
   // Built the HTML output for the sidebar of loaded agents
   loadedAgents = agents;
   
   let html = "";
   
   // todo: use react/angular for this
   for (uuid in agents) {
       html += '<div class="agent" onclick="moveTo(this)"><p class="uuid"><span class="dot"></span> ' + uuid + '</p></div>'
   }

   console.log("Got agents", loadedAgents);
   
   $('.sidebar-inner').html(html); 
});

socket.on('disconnect', () => {
   $('.sidebar-inner').html("Lost connection to the server."); 
});