package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.app.models.Contato;
import com.app.repositories.RepositorioContato;

@Component
public class ContatoService {

	@Autowired
	RepositorioContato repositorioContato;

	public List<Contato> listarTodos() {
		return (List<Contato>) repositorioContato.findAll();
	}

	public Contato buscaPorId(Integer id) {
		return repositorioContato.findByIdContato(id);
	}

	public Boolean contatoExistente(Integer id) {
		return repositorioContato.exists(id);
	}

	public void salvarContato(Contato contato) {
		repositorioContato.save(contato);
	}

	public void salvarLista(List<Contato> listaContatos) {
		repositorioContato.save(listaContatos);
	}
}
