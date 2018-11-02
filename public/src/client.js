var socket = io();

socket.on('agents', (agents) => {
   // Built the HTML output for the sidebar of loaded agents
   let html = "";
   
   // todo: use react/angular for this
   for (uuid in agents) {
       html += '<div class="agent"><p><span class="dot"></span> ' + uuid.split('-')[0] + '</p></div>'
   }
   
   $('.sidebar-inner').html(html); 
});