package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.app.models.Grupo;
import com.app.repositories.RepositorioGrupo;

@Component
public class GrupoService {

	@Autowired
	RepositorioGrupo repositorioGrupo;

	public List<Grupo> listarTodos() {
		return (List<Grupo>) repositorioGrupo.findAll();
	}

	public Grupo buscaPorId(Integer id) {
		return repositorioGrupo.findByIdGrupo(id);
	}

	public Boolean grupoExistente(Integer id) {
		return repositorioGrupo.exists(id);
	}

	public void salvarGrupo(Grupo grupo) {
		repositorioGrupo.save(grupo);
	}

	public void salvarLista(List<Grupo> listaGrupos) {
		repositorioGrupo.save(listaGrupos);
	}
}