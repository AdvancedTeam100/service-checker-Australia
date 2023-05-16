import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// Import Lib
import '../imports/ui/lib/global/globalfunction.js';
import '../imports/ui/lib/global/colResizable.js';

// Import Pages
import '../imports/ui/pages/home/home.js';
import '../imports/ui/pages/edit/edit.js';
import '../imports/ui/pages/admin/admin.js';
import '../imports/ui/pages/login/login.js';
import '../imports/ui/pages/forgotpassword/forgotpassword.js';
import '../imports/ui/pages/register/register.js';

// Import Layout
import '../imports/ui/layouts/login-layout/login-layout.js';
import '../imports/ui/layouts/main-layout/main-layout.js';

// Import config js
import '../imports/ui/lib/global/utBarcodeConst.js';

// Import Library
import 'jquery-editable-select';
import 'datatables.net';
import 'datatables.net-buttons';
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.print.min.mjs';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.mjs';
import 'datatables.net-responsive/js/dataTables.responsive.min.mjs'
import 'datatables.net-responsive-bs4/js/responsive.bootstrap4.min.mjs'
import "datatables.net-colreorder";


// Import Template
import '../imports/ui/components/common/EditServiceCheckerModal/editServiceCheckerModal.js';
import '../imports/ui/components/common/copyfrequencypop/copyfrequencypop.js';

// Import VS1 Templates
import '../imports/ui/components/common/Help_Form/help_button.html';

import '../imports/ui/components/datatablelist/datatablelist.js';
import '../imports/ui/components/template_buttons/export_import_print_display_button.js';
import '../imports/ui/components/toggle_button/toggle_button.html';
import '../imports/ui/components/vs1_button/vs1_button.js';
import '../imports/ui/components/vs1_input/default_input.html';
import '../imports/ui/components/vs1_video/vs1_login_video.js';

// currently use
import '../imports/ui/components/non_transactional_list/non_transactional_list.js';


import './route.js';
import './main.html';