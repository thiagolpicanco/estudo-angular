package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.app.models.Nota;
import com.app.repositories.RepositorioNota;

@Component
public class NotaService {

	@Autowired
	RepositorioNota repositorioNota;

	public List<Nota> listarTodos() {
		return (List<Nota>) repositorioNota.findAll();
	}

	public Nota buscaPorId(Integer id) {
		return repositorioNota.findByIdNota(id);
	}

	public List<Nota> buscaPorTlNota(String tlNota) {
		return repositorioNota.findByTlNotaContainingIgnoreCase(tlNota);
	}

	public List<Nota> buscaPorDeNota(String deNota) {
		return repositorioNota.findByDeNotaLike(deNota);
	}

	public Boolean notaExistente(Integer id) {
		return repositorioNota.exists(id);
	}

	public void salvarNota(Nota nota) {
		repositorioNota.save(nota);
	}

	public void salvarLista(List<Nota> listaNotas) {
		repositorioNota.save(listaNotas);
	}

	public void deletarNota(Integer notaId) {
		repositorioNota.delete(notaId);
	}
}