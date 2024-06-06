/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
function print_specific_div_content () {
  const win = window.open('', '', 'left=0,top=0,width=auto,height=auto,toolbar=0,scrollbars=0,status =0')

  let content = `<html>
<link rel="stylesheet" href="/vendors/feather/feather.css"/>
<link rel="stylesheet" href="/vendors/mdi/css/materialdesignicons.min.css"/>
<link rel="stylesheet" href="/vendors/ti-icons/css/themify-icons.css"/>
<link rel="stylesheet" href="/vendors/typicons/typicons.css"/>
<link rel="stylesheet" href="/vendors/simple-line-icons/css/simple-line-icons.css"/>
<link rel="stylesheet" href="/vendors/css/vendor.bundle.base.css"/>
<link rel="stylesheet" href="/vendors/datatables.net-bs4/dataTables.bootstrap4.css"/>
<link rel="stylesheet" href="/js/select.dataTables.min.css"/>
<link rel="stylesheet" href="/css/vertical-layout-light/style.css"/>
<link rel="stylesheet" href="/vendors/ti-icons/css/themify-icons.css"/>
<link rel="stylesheet" href="/vendors/css/vendor.bundle.base.css"/>
<link rel="stylesheet" href="/vendors/codemirror/codemirror.css"/>
<link rel="stylesheet" href="/vendors/codemirror/ambiance.css"/>
<link rel="stylesheet" href="/vendors/pwstabs/jquery.pwstabs.min.css"/>
<link rel="stylesheet" href="/css/vertical-layout-light/style.css"/>`
  content += '<body onload="window.print(); window.close();">'
  content += document.getElementById('divToPrint').innerHTML
  content += '</body>'
  content += '</html>'
  win.document.write(content)
  win.document.close()
}
