const html = function() {

  this.service = {
    read: createService('GET', '/api/filemanager/file/' + filepath),
    update: createService('PUT', '/api/filemanager/file/' + filepath)
  };

  this.elementDOM = {};
  this.newAttribute = {
    name: '',
    value: ''
  };




  this.hoverNode = null;
  this.nodeTreedom = null;
  this.node = null;
}

html.prototype.start = async function(parent) {

  this.parent = parent;

  this.visualcontentEventListener();

  this.treeDomEventListener();

  await this.read();
}

html.prototype.read = async function() {
  try {

    const response = await this.service.read();

    if (response.error) {
      throw (response.error);
    }

    this.textHtml = response.data;

    this.primeraRenderizacion();

  } catch (error) {
    console.log(error);
    this.parent.modal.notify(error, 'error');
  }
}

html.prototype.update = async function() {
  try {

    const confirmar = await this.parent.modal.confirm('Confirme actualización, esto no tiene vuelta atras', 'Cancelar', 'Aceptar');
    if(!confirmar) {
      return;
    }
    
    const response = await this.service.update({}, {
      content: this.formatHTML(document.getElementById('visualcontent').innerHTML)
    });

    if (response.error) {
      throw new Error(response.error);
    }

    console.log(response);

    //this.read();
    location.reload();

  } catch (error) {
    console.log(error);
    this.parent.modal.notify(error, 'error');
  }
}

html.prototype.extractIn = function(content, from, to) {
  console.log(new Date(), 'extractIn');
  var index1 = content.indexOf(from) + from.length;
  content = content.substring(index1);
  var index2 = content.indexOf(to);
  return content.substring(0, index2);
}

html.prototype.primeraRenderizacion = function() {
  console.log(new Date(), 'primeraRenderizacion');

  const htmlSinScript = this.textHtml; //.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  let head = '';
  if (this.textHtml.indexOf("<head>") > -1) {
    head = this.extractIn(this.textHtml, "<head>", "</head>");
  }

  let body = '';
  if (this.textHtml.indexOf("<body>") > -1) {
    body = this.extractIn(this.textHtml, "<body>", "</body>");
  } else {
    body = this.textHtml;
  }

  //20250405:agregar css
  document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML + head;
  document.getElementById('visualcontent').innerHTML = body;
}

html.prototype.visualcontentEventListener = function() {

  $("#visualcontent").delegate("a", "click", function() {
    console.log(new Date(), 'delegate-a-click');
    return false;
  });

  $("#visualcontent").delegate("*", "dblclick", (event) => {
    this.elementDOM = event.target;
    $("#dvModal").modal("show");
    return false;
  });

}

html.prototype.pushAttr = function() {
  console.log(new Date(), 'pushAttr');
  console.log(this.newAttribute);
  this.elementDOM.setAttribute(this.newAttribute.name, this.newAttribute.value);
  this.newAttribute.name = '';
  this.newAttribute.value = '';
}

html.prototype.removeAttr = function(index) {
  console.log(new Date(), 'removeAttr');
  this.elementDOM.removeAttribute(this.elementDOM.attributes[index].name);
  $('#dvModal').modal('hide');
}

/*********/
/*TREEDOM*/
/*********/

html.prototype.treeDomEventListener = function() {

  this.treeDom = document.getElementById("treeDom");

  this.treeDom.addEventListener('dragover', (event) => {
    this.treeDOMDragover(event)
  });

  this.treeDom.addEventListener('dragenter', (event) => {
    this.treeDOMDragenter(event)
  });

  this.treeDom.addEventListener('drop', (event) => {
    this.treeDOMDrop(event)
  });

  $('#treeDom').delegate('li', 'dragstart', (event) => {
    this.treeDOMDragstart(event.originalEvent);
  });

  $('#treeDom').delegate('li', 'dragend', (event) => {
    this.treeDOMDragend(event);
  });

  $('#treeDom').delegate('li', 'click', (event) => {
    this.treeDOMClick(event);
  });

  $('#treeDom').delegate('span', 'click', (event) => {
    this.treeDOMSpanClick(event);
  });

  document.getElementsByTagName('body')[0].addEventListener('keydown', (event) => {
    this.treeDOMKeyDown(event)
  });
}

html.prototype.refreshTreeDOM = function() {
  console.log(new Date(), 'refreshTreeDOM');

  this.treeDom.innerHTML = "";
  this.hoverNode = this.treeDom;

  let dom = $('#visualcontent').html();
  dom = this.textToDom(dom);
  dom = this.domToArr(dom);
  dom = this.arrToTree(dom);
  dom = this.textToDom(dom);

  for (let i = 0; i < dom.length; i++) {
    if ($(this.hoverNode).hasClass("divider")) {
      this.hoverNode.parentNode.insertBefore(dom[i], this.hoverNode.nextSibling);
    } else {
      if (this.hoverNode == this.treeDom) {
        this.hoverNode.appendChild(dom[i]);
      } else {
        if (this.hoverNode.getElementsByTagName("UL").length > 0) {
          this.hoverNode.getElementsByTagName("UL")[0].appendChild(dom[i]);
        } else {
          const ul = document.createElement("ul");
          ul.appendChild(dom[i]);
          this.hoverNode.appendChild(ul);
        }
      }
    }
  }
}

//eventos DRAGGABLES de UL
html.prototype.treeDOMDragover = function(event) {
  console.log(new Date(), 'treeDOMDragover');
  event.preventDefault();
}

html.prototype.treeDOMDragenter = function(event) {
  console.log(new Date(), 'treeDOMDragenter');
  try {
    event.preventDefault();
    $(this.treeDom).find("li").removeClass("over");
    $(event.target).addClass("over");
    this.overNode = event.target;
  } catch (error) {
    console.log(error);
    this.parent.modal.notify(error, 'error');
    return false;
  }
}

html.prototype.treeDOMDrop = function(event) {

  console.log(new Date(), 'treeDOMDrop');

  event.preventDefault();

  $(this.treeDom).find("li").removeClass("over");

  if (event.target.querySelector('ul')) {
    event.target.querySelector('ul').appendChild(this.domDraggable.previousElementSibling); //.cloneNode(true));
    event.target.querySelector('ul').appendChild(this.domDraggable); //.cloneNode(true));
  } else {
    event.target.after(this.domDraggable.previousElementSibling.cloneNode(true));
    event.target.after(this.domDraggable.cloneNode(true));
  }

  document.getElementById('visualcontent').innerHTML = this.treeToDom(document.getElementById('treeDom').childNodes);

}

//eventos DRAGGABLES de LIs
html.prototype.treeDOMDragstart = function(event) {
  console.log(new Date(), 'treeDOMDragstart');
  if (!event.target.hasAttribute("data-iselement")) {
    return false;
  }
  this.domDraggable = event.target;
}

html.prototype.treeDOMDragend = function(event) {
  console.log(new Date(), 'treeDOMDragend');
  this.domDraggable = null;
  document.querySelectorAll("#treeDom li").forEach(li => li.classList.remove("nodeSelected")); //parche cuando se copia elemento clickeado anteriormente
}

//eventos de LIs

html.prototype.treeDOMClick = function(event) {
  console.log(new Date(), 'treeDOMClick');

  document.querySelectorAll("#treeDom li").forEach(li => li.classList.remove("nodeSelected"));

  $(event.target).addClass('nodeSelected');

  //document.getElementById('visualcontent').innerHTML = this.treeToDom(document.getElementById('treeDom').childNodes);
}

html.prototype.treeDOMKeyDown = function(event) {
  switch (event.keyCode) {
    case 46:
      try {
        const nodeSelected = $(this.treeDom).find('.nodeSelected');
        if (nodeSelected.length == 0) {
          console.log('no remove');
          return;
        }
        nodeSelected[0].parentNode.removeChild(nodeSelected[0].previousSibling);
        nodeSelected[0].parentNode.removeChild(nodeSelected[0]);
        document.getElementById('visualcontent').innerHTML = this.treeToDom(document.getElementById('treeDom').childNodes);
      } catch (error) {
        console.log(error);
        this.parent.modal.notify(error, 'error');
        document.querySelectorAll("#treeDom li").forEach(li => li.classList.remove("nodeSelected"));
      }
      break;
  }

}

html.prototype.treeDOMSpanClick = function(event) {
  console.log(new Date(), 'spanClick');
  if (event.target.nextSibling != null) {
    var ul = $(event.target.nextSibling);

    if (ul.hasClass("noDisplay")) {
      ul.removeClass("noDisplay");
      event.target.innerHTML = event.target.innerHTML.replace("+", "");
    } else {
      ul.addClass("noDisplay")
      event.target.innerHTML = event.target.innerHTML + "+";
    }
  }
  event.stopImmediatePropagation();
}

/*********/
//CONVERT*/
/*********/

html.prototype.textToDom = function(textHtml) {
  return $(textHtml);
}

html.prototype.domToArr = function(dom) {
  var arr = [];
  for (var i = 0; i < dom.length; i++) {
    var node = dom[i];
    if (node.nodeType == 1) {

      var attrs = [];
      for (var x = 0; x < node.attributes.length; x++) {
        attrs.push({
          name: node.attributes[x].name,
          value: node.attributes[x].value
        });
      }

      var children = [];
      if (node.childNodes) {
        children = this.domToArr(node.childNodes);
      }

      arr.push({
        type: "element",
        name: node.nodeName,
        attributes: attrs,
        children: children
      });
    } else if (node.nodeType == 3) {
      if (node.nodeValue.trim() != "") {
        arr.push({
          type: "textnode",
          value: node.nodeValue
        });
      }
    } else if (node.nodeType == 8) {
      arr.push({
        type: "comment",
        value: node.nodeValue
      });
    }
  }
  return arr;
}

html.prototype.arrToTree = function(arr) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];

    str += "<li class='list-group-item divider'></li>";

    if (obj.type == "element") {

      //parche:algunos atributos contienen codigo dentro, incluso ' y " por ende estos son reemplazados para su procesamiento
      var attrs = JSON.stringify(arr[i].attributes);
      if (attrs.indexOf("'") > -1) {
        attrs = attrs.split("'").join("\\\"");
      }
      //parche:fin

      str += "<li class='list-group-item' draggable='true' data-iselement data-element='" + arr[i].name + "' data-attrs='" + attrs + "'><span>" + arr[i].name + "</span>";
      if (arr[i].children && arr[i].children.length > 0) {
        str += "<ul>" + this.arrToTree(arr[i].children) + "</ul>";
      }
      str += "</li>"

    } else if (obj.type == "textnode") {
      str += "<li class='list-group-item' data-istextnode data-value='" + obj.value + "'><span>TEXTNODE</span></li>";
    } else if (obj.type == "comment") {
      str += "<li class='list-group-item' data-iscomment data-value='" + obj.value + "'><span>COMENTARIO</span></li>";
    }

  }
  return str;
}

html.prototype.treeToDom = function(domArr) {
  var html = "";

  for (var i = 0; i < domArr.length; i++) {
    var dom = domArr[i];
    if (dom.hasAttribute("data-iselement")) {
      var varElement = dom.getAttribute("data-element").toLowerCase();
      var varAttrs = JSON.parse(dom.getAttribute("data-attrs"));

      var attrs = "";
      for (var x = 0; x < varAttrs.length; x++) {
        attrs += varAttrs[x].name + "=\"" + varAttrs[x].value.split("\"").join("'") + "\" ";
      }

      var newhtml;
      if (["br", "hr", "img", "input"].indexOf(varElement) > -1) {
        newhtml = "<**element** **attrs**/>";
      } else {
        newhtml = "<**element** **attrs**>**children**" + "</**element**>";
      }

      newhtml = newhtml.split("**element**").join(varElement);
      newhtml = newhtml.replace("**attrs**", attrs);

      if (dom.getElementsByTagName("UL").length > 0) {
        newhtml = newhtml.replace("**children**", this.treeToDom(dom.childNodes[1].childNodes));
      } else {
        newhtml = newhtml.replace("**children**", "");
      }

      html += newhtml;
    } else if (dom.hasAttribute("data-istextnode")) {
      html += dom.getAttribute("data-value");
    } else if (dom.hasAttribute("data-iscomment")) {
      html += "<!--" + dom.getAttribute("data-value") + "-->";
    }
  }
  return html;
}

//Format
html.prototype.formatHTML = function(html) {
  const tab = '\t';
  let result = '';
  let indentLevel = 0;

  // Lista de etiquetas inline comunes (puedes agregar más si quieres)
  const inlineTags = []; //['a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'br', 'button', 'cite', 'code', 'dfn', 'em', 'i', 'img', 'input', 'kbd', 'label', 'map', 'object', 'output', 'q', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'textarea', 'time', 'tt', 'var','p'];

  html = html.replace(/>\s+</g, '><').trim();

  const tokens = html.split(/(?=<)|(?<=>)/g).filter(token => token.trim());

  tokens.forEach((token, index) => {
    const isClosingTag = /^<\//.test(token);
    const isOpeningTag = /^<[^/!].*[^/]?>$/.test(token);
    const tagNameMatch = token.match(/^<\/?([a-zA-Z0-9]+)/);
    const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
    const isInline = inlineTags.includes(tagName);

    if (isClosingTag && !isInline) indentLevel--;

    if (!isInline) {
      result += tab.repeat(indentLevel);
    }

    result += token.trim();

    const nextToken = tokens[index + 1];
    const nextIsInline = nextToken && inlineTags.includes((nextToken.match(/^<\/?([a-zA-Z0-9]+)/) || [])[1]?.toLowerCase());

    if (!isInline && !(isOpeningTag && nextIsInline)) {
      result += '\n';
    }

    if (isOpeningTag && !isInline) indentLevel++;
  });

  return result;
}

app.modules.html = html;