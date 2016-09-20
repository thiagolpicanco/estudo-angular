package com.app.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.app.models.Grupo;

/**
 * 
 * @author bruno.calmon
 *
 */
@RepositoryRestResource(collectionResourceRel = "Grupo", path = "Grupo")
public interface RepositorioGrupo extends PagingAndSortingRepository<Grupo, Integer> {
	/**
	 * 
	 * @param grupo
	 * @return grupo
	 */
	Grupo findByIdGrupo(Integer grupo);

	/**
	 * 
	 * @param noGrupo
	 * @return listaGrupo
	 */
	List<Grupo> findByNoGrupoLike(String noGrupo);
}
