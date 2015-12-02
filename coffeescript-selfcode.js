styles = """
/* 
 * www.l4k3y.co.uk
 */

body {
  background-color: #1a1c24; color: #fff;
  font-size: 13px; line-height: 1.4;
  -webkit-font-smoothing: subpixel-antialiased;
  padding: 0; margin:0;
}

/*            
 * This CSS is being injected into a DOM <style> element 
 * and written in this <pre> element simultaneously.        
 *
 */

pre { 
  position: fixed; width: 50%;
  top: 0px; bottom: 0px; left: 0%;
  margin:0px;
  transition: left 500ms;
  background-color: #313744; color: #a6c3d4;
  padding: 24px 12px;
  box-sizing: border-box;
  overflow:scroll;
}
pre em:not(.comment) { font-style: normal; }
.comment       { color: #707e84; }
.selector      { color: #c66c75; }
.selector .key { color: #c66c75; }
.key           { color: #c7ccd4; }
.value         { color: #d5927b; }

#mainwrapper {
  float:right; 
  width:50%; 
  background-color:#fff;
  overflow:hidden;
  display: block !important;
}

header {
  background-color:#ccc;
  width:100%;
  height:20px;
} 

footer {
  background-color:#ccc;
  width:100%;
  height:20px;
  margin-top:20px;
}

footer p {
  font-size:1.3em;
  color:#777777;
}
"""

openComment = false

writeStyleChar = (which) ->
  # begin wrapping open comments
  if which == '/' && openComment == false
    openComment = true
    styles = $('#style-text').html() + which
  else if which == '/' && openComment == true
    openComment = false
    styles = $('#style-text').html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>')
  # wrap style declaration
  else if which == ':'
    styles = $('#style-text').html().replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:')
  # wrap style value 
  else if which == ';'
    styles = $('#style-text').html().replace(/([^:]*)$/, '<em class="value">$1</em>;')
  # wrap selector
  else if which == '{'
    styles = $('#style-text').html().replace(/(.*)$/, '<em class="selector">$1</em>{')
  else
    styles = $('#style-text').html() + which
  $('#style-text').html styles
  $('#style-tag').append which

writeStyles = (message, index, interval) ->
  if index < message.length
    pre = document.getElementById 'style-text'
    pre.scrollTop = pre.scrollHeight
    writeStyleChar message[index++]
    setTimeout (->
      writeStyles message, index, interval
    ), interval
    

# appending the tags I'll need.
$('body').append """
  <style id="style-tag"></style>
  <pre id="style-text"></pre>
<div id="mainwrapper" style="display:none;">
<header>

</header>
<footer>
<p>&copy; www.l4k3y.co.uk</p>
</footer>
</div>


    
"""
time = if window.innerWidth <= 578 then 4 else 16

writeStyles(styles, 0, time)
