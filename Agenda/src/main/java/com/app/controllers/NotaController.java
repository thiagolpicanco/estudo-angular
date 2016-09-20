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
public class NotaController {

	@Autowired
	NotaService notaService;
	@Autowired
	GrupoService grupoService;

	/**
	 * 
	 * @return lista com todas as notas
	 */
	@RequestMapping(value = "/notas", produces = "application/JSON")
	public List<Nota> listaNotas() {
		return notaService.listarTodos();
	}

	@RequestMapping(value = "/nota/{titulo}", produces = "application/JSON")
	public ResponseEntity<List<Nota>> getNotaByTituloOrDescribe(@PathVariable("titulo") String titulo) {
		List<Nota> listNota = notaService.buscaPorTlNota(titulo);
		if (null != listNota) {
			return new ResponseEntity<>(listNota, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	/**
	 * 
	 * @param nota
	 * @param ucBuilder
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/novaNota/", method = RequestMethod.POST)
	public ResponseEntity<Void> createNota(@RequestBody Nota nota, UriComponentsBuilder ucBuilder) {

		if (null != nota.getIdNota() && notaService.notaExistente(nota.getIdNota())) {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
		if (null != nota.getListaGrupos() && !nota.getListaGrupos().isEmpty()) {
			for (Grupo grupo : nota.getListaGrupos()) {
				if (grupoService.grupoExistente(grupo.getIdGrupo())) {
					grupo.getListaNotas().add(nota);
				}
			}
		}

		nota.setDtCriNota(new Date());

		notaService.salvarNota(nota);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/nota/{id}").buildAndExpand(nota.getIdNota()).toUri());
		return new ResponseEntity<>(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/editarNota/", method = RequestMethod.PUT)
	public ResponseEntity<Void> editNota(@RequestBody Nota nota, UriComponentsBuilder ucBuilder) {

		if (null == nota.getIdNota() && !notaService.notaExistente(nota.getIdNota())) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}

		if (null != nota.getListaGrupos() && !nota.getListaGrupos().isEmpty()) {
			for (Grupo grupo : nota.getListaGrupos()) {
				if (grupoService.grupoExistente(grupo.getIdGrupo())) {
					grupo.getListaNotas().add(nota);
				}
			}
		}

		notaService.salvarNota(nota);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/nota/{id}").buildAndExpand(nota.getIdNota()).toUri());
		return new ResponseEntity<>(headers, HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/deleteNota/{notaId}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteNota(@PathVariable("notaId") Integer notaId, UriComponentsBuilder ucBuilder) {
		if (!notaService.notaExistente(notaId)) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		notaService.deletarNota(notaId);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/nota/{id}").buildAndExpand(notaId).toUri());
		return new ResponseEntity<>(headers, HttpStatus.ACCEPTED);
	}
}
