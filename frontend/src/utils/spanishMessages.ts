import { TranslationMessages } from "ra-core";

const spanishMessages: TranslationMessages = {
  ra: {
    action: {
      add_filter: "Agregar filtro",
      add: "Agregar",
      back: "Regresar",
      bulk_actions:
        "1 elemento seleccionado |||| %{smart_count} elementos seleccionados",
      cancel: "Cancelar",
      clear_array_input: "Limpiar la lista",
      clear_input_value: "Borrar valor",
      clone: "Clonar",
      confirm: "Confirmar",
      create: "Crear",
      create_item: "Crear %{item}",
      delete: "Eliminar",
      edit: "Editar",
      export: "Exportar",
      list: "Lista",
      refresh: "Actualizar",
      remove_filter: "Quitar este filtro",
      remove_all_filters: "Quitar todos los filtros",
      remove: "Eliminar",
      save: "Guardar",
      search: "Buscar",
      search_columns: "Buscar columnas",
      select_all: "Seleccionar todo",
      select_all_button: "Seleccionar todo",
      select_row: "Seleccionar fila",
      show: "Mostrar",
      sort: "Ordenar",
      undo: "Deshacer",
      unselect: "Deseleccionar",
      expand: "Expandir",
      close: "Cerrar",
      open_menu: "Abrir menú",
      close_menu: "Cerrar menú",
      update: "Actualizar",
      move_up: "Mover arriba",
      move_down: "Mover abajo",
      open: "Abrir",
      toggle_theme: "Cambiar modo claro/oscuro",
      select_columns: "Seleccionar columnas",
      update_application: "Recargar aplicación",
    },
    boolean: {
      true: "Sí",
      false: "No",
      null: " ",
    },
    page: {
      create: "Crear %{name}",
      dashboard: "Panel",
      edit: "%{name} %{recordRepresentation}",
      error: "Ocurrió un error",
      list: "%{name}",
      loading: "Cargando",
      not_found: "No encontrado",
      show: "%{name} %{recordRepresentation}",
      empty: "No hay %{name} aún.",
      invite: "¿Desea agregar uno?",
      access_denied: "Acceso denegado",
      authentication_error: "Error de autenticación",
    },
    input: {
      file: {
        upload_several:
          "Arrastra algunos archivos para subir, o haz clic para seleccionar.",
        upload_single:
          "Arrastra un archivo para subir, o haz clic para seleccionarlo.",
      },
      image: {
        upload_several:
          "Arrastra imágenes para subir, o haz clic para seleccionar.",
        upload_single:
          "Arrastra una imagen para subir, o haz clic para seleccionarla.",
      },
      references: {
        all_missing: "No se pueden encontrar los datos de referencia.",
        many_missing:
          "Al menos una de las referencias asociadas ya no está disponible.",
        single_missing: "La referencia asociada ya no está disponible.",
      },
      password: {
        toggle_visible: "Ocultar contraseña",
        toggle_hidden: "Mostrar contraseña",
      },
    },
    message: {
      about: "Acerca de",
      access_denied: "No tiene permisos suficientes para acceder a esta página",
      are_you_sure: "¿Está seguro?",
      authentication_error:
        "El servidor de autenticación devolvió un error y sus credenciales no pudieron ser verificadas.",
      auth_error: "Ocurrió un error al validar el token de autenticación.",
      bulk_delete_content:
        "¿Está seguro de que desea eliminar este %{name}? |||| ¿Está seguro de que desea eliminar estos %{smart_count} elementos?",
      bulk_delete_title:
        "Eliminar %{name} |||| Eliminar %{smart_count} %{name}",
      bulk_update_content:
        "¿Está seguro de que desea actualizar %{name} %{recordRepresentation}? |||| ¿Está seguro de que desea actualizar estos %{smart_count} elementos?",
      bulk_update_title:
        "Actualizar %{name} %{recordRepresentation} |||| Actualizar %{smart_count} %{name}",
      clear_array_input: "¿Está seguro de que desea limpiar toda la lista?",
      delete_content: "¿Está seguro de que desea eliminar este %{name}?",
      delete_title: "Eliminar %{name} %{recordRepresentation}",
      details: "Detalles",
      error:
        "Ocurrió un error en el cliente y su solicitud no pudo completarse.",
      invalid_form: "El formulario no es válido. Verifique los errores",
      loading: "Cargando",
      no: "No",
      not_found: "Escribió una URL incorrecta o siguió un enlace erróneo.",
      select_all_limit_reached:
        "Hay demasiados elementos para seleccionarlos todos. Solo se seleccionaron los primeros %{max}.",
      unsaved_changes:
        "Algunos de sus cambios no se guardaron. ¿Está seguro de que desea ignorarlos?",
      yes: "Sí",
      placeholder_data_warning:
        "Problema de red: la actualización de datos falló.",
    },
    navigation: {
      clear_filters: "Limpiar filtros",
      no_filtered_results:
        "No se encontraron %{name} con los filtros actuales.",
      no_results: "No se encontraron %{name}",
      no_more_results:
        "El número de página %{page} está fuera de los límites. Intente con la página anterior.",
      page_out_of_boundaries: "Número de página %{page} fuera de límites",
      page_out_from_end: "No se puede ir más allá de la última página",
      page_out_from_begin: "No se puede ir antes de la página 1",
      page_range_info: "%{offsetBegin}-%{offsetEnd} de %{total}",
      partial_page_range_info:
        "%{offsetBegin}-%{offsetEnd} de más de %{offsetEnd}",
      current_page: "Página %{page}",
      page: "Ir a la página %{page}",
      first: "Ir a la primera página",
      last: "Ir a la última página",
      next: "Ir a la página siguiente",
      previous: "Ir a la página anterior",
      page_rows_per_page: "Filas por página:",
      skip_nav: "Saltar al contenido",
    },
    sort: {
      sort_by: "Ordenar por %{field_lower_first} %{order}",
      ASC: "ascendente",
      DESC: "descendente",
    },
    auth: {
      auth_check_error: "Inicie sesión para continuar",
      user_menu: "Perfil",
      username: "Usuario",
      password: "Contraseña",
      email: "Correo electrónico",
      sign_in: "Iniciar sesión",
      sign_in_error: "Error de autenticación, intente nuevamente",
      logout: "Cerrar sesión",
    },
    notification: {
      updated:
        "Elemento actualizado |||| %{smart_count} elementos actualizados",
      created: "Elemento creado",
      deleted: "Elemento eliminado |||| %{smart_count} elementos eliminados",
      bad_item: "Elemento incorrecto",
      item_doesnt_exist: "El elemento no existe",
      http_error: "Error de comunicación con el servidor",
      data_provider_error:
        "Error en el proveedor de datos. Verifique la consola para más detalles.",
      i18n_error:
        "No se pueden cargar las traducciones para el idioma especificado",
      canceled: "Acción cancelada",
      logged_out: "Su sesión ha terminado, por favor conéctese de nuevo.",
      not_authorized: "No está autorizado para acceder a este recurso.",
      application_update_available: "Hay una nueva versión disponible.",
    },
    validation: {
      required: "Requerido",
      minLength: "Debe tener al menos %{min} caracteres",
      maxLength: "Debe tener %{max} caracteres o menos",
      minValue: "Debe ser al menos %{min}",
      maxValue: "Debe ser %{max} o menos",
      number: "Debe ser un número",
      email: "Debe ser un correo electrónico válido",
      oneOf: "Debe ser uno de: %{options}",
      regex: "Debe coincidir con el formato (regexp): %{pattern}",
      unique: "Debe ser único",
    },
    saved_queries: {
      label: "Consultas guardadas",
      query_name: "Nombre de la consulta",
      new_label: "Guardar consulta actual...",
      new_dialog_title: "Guardar consulta actual como",
      remove_label: "Eliminar consulta guardada",
      remove_label_with_name: 'Eliminar consulta "%{name}"',
      remove_dialog_title: "¿Eliminar consulta guardada?",
      remove_message:
        "¿Está seguro de que desea eliminar este elemento de su lista de consultas guardadas?",
      help: "Filtre la lista y guarde esta consulta para después",
    },
    configurable: {
      customize: "Personalizar",
      configureMode: "Configurar esta página",
      inspector: {
        title: "Inspector",
        content:
          "Pase el cursor sobre los elementos de la interfaz para configurarlos",
        reset: "Restablecer configuración",
        hideAll: "Ocultar todo",
        showAll: "Mostrar todo",
      },
      Datagrid: {
        title: "Tabla de datos",
        unlabeled: "Columna sin etiqueta #%{column}",
      },
      SimpleForm: {
        title: "Formulario",
        unlabeled: "Entrada sin etiqueta #%{input}",
      },
      SimpleList: {
        title: "Lista",
        primaryText: "Texto principal",
        secondaryText: "Texto secundario",
        tertiaryText: "Texto terciario",
      },
    },
  },
  resources: {
    users: {
      name: "Usuario |||| Usuarios",
      fields: {
        name: "Nombre",
        email: "Correo electrónico"
      }
    }}

};

export default spanishMessages;
