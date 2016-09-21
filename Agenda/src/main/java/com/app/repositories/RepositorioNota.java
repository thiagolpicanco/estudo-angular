package com.app.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.app.models.Nota;

/**
 * 
 * @author bruno.calmon
 *
 */
@RepositoryRestResource(collectionResourceRel = "Nota", path = "Nota")
public interface RepositorioNota extends PagingAndSortingRepository<Nota, Integer> {
	/**
	 * 
	 * @param id
	 * @return nota
	 */
	Nota findByIdNota(Integer idNota);

	/**
	 * 
	 * @param tlNota
	 * @return listaNotas
	 */

	List<Nota> findByTlNotaContainingIgnoreCase(String tlNota);

	/**
	 * 
	 * @param deNota
	 * @return listaNotas
	 */
	List<Nota> findByDeNotaLike(String deNota);
}
