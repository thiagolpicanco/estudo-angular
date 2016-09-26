
package com.app.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.app.models.Grupo;
import com.app.models.Nota;
import com.app.services.GrupoService;
import com.app.services.NotaService;

/**
 * 
 * @author bruno.calmon
 *
 */
@RestController()
public class GrupoController {

	@Autowired
	NotaService notaService;
	@Autowired
	GrupoService grupoService;
	
	
	@RequestMapping(value = "/grupo/{id}", produces = "application/JSON")
	public ResponseEntity<List<Nota>> getNotaByGrupoById(@PathVariable("id") Integer id) {
		Grupo grupo = grupoService.buscaPorId(id);
		if (null != grupo) {
			return new ResponseEntity<>(grupo.getListaNotas(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	/**
	 * 
	 * @return lista com todas as notas
	 */
	@RequestMapping(value = "/grupos", produces = "application/JSON")
	public List<Grupo> listaGrupo() {
		return grupoService.listarTodos();
	}

	/**
	 * 
	 * @param nota
	 * @param ucBuilder
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/novoGrupo/", method = RequestMethod.POST)
	public ResponseEntity<Void> createGrupo(@RequestBody Grupo grupo, UriComponentsBuilder ucBuilder) {

		if (null != grupo.getIdGrupo() && grupoService.grupoExistente(grupo.getIdGrupo())) {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}


		grupo.setDtCriGrupo(new Date());

		grupoService.salvarGrupo(grupo);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/grupo/{id}").buildAndExpand(grupo.getIdGrupo()).toUri());
		return new ResponseEntity<>(headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/deleteGrupo/{grupoId}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteNota(@PathVariable("grupoId") Integer grupoId, UriComponentsBuilder ucBuilder) {
		if (!grupoService.grupoExistente(grupoId)) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		
		Grupo grupo = grupoService.buscaPorId(grupoId);
		
		for (Nota nota : grupo.getListaNotas()) {
			nota.getListaGrupos().remove(grupo);
		}
		
		grupoService.deletarGrupo(grupoId);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/grupo/{id}").buildAndExpand(grupoId).toUri());
		return new ResponseEntity<>(headers, HttpStatus.ACCEPTED);
	}
}
