package com.app.controllers;

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

import com.app.models.Contato;
import com.app.models.Telefone;
import com.app.services.ContatoService;

@RestController()
public class ContatoController {

	@Autowired
	ContatoService contatoService;

	@RequestMapping(value = "/contatos", produces = "application/JSON")
	public List<Contato> listaContatos() {
		return contatoService.listarTodos();
	}

	@RequestMapping(value = "/contato/{id}", produces = "application/JSON")
	public ResponseEntity<Contato> getContatoByID(@PathVariable("id") int id) {
		Contato Contato = contatoService.buscaPorId(id);
		if (null != Contato) {
			return new ResponseEntity<Contato>(Contato, HttpStatus.OK);
		}
		return new ResponseEntity<Contato>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/novoContato/", method = RequestMethod.POST)
	public ResponseEntity<Void> createContato(@RequestBody Contato Contato, UriComponentsBuilder ucBuilder) {

		if (Contato.getIdContato() != null && contatoService.contatoExistente(Contato.getIdContato())) {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
		if (Contato.getListaTelefones() != null) {
			if (Contato.getListaTelefones() != null || !Contato.getListaTelefones().isEmpty()) {
				for (Telefone tel : Contato.getListaTelefones()) {
					tel.setContato(Contato);
				}
			}
		}

		contatoService.salvarContato(Contato);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/contato/{id}").buildAndExpand(Contato.getIdContato()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
}
