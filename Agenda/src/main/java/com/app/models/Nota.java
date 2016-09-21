package com.app.models;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Nota {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idNota;

	@Column(columnDefinition = "VARCHAR(150)", nullable = false)
	private String tlNota;

	@Column(columnDefinition = "TEXT")
	private String deNota;

	@Column
	private Date dtCriNota;

	@Column
	private Date dtAltNota;
	
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer posicao;

	@Column(columnDefinition = "TEXT")
	private String cor;

	@Column
	private Byte[] imagem;

	@ManyToMany(fetch = FetchType.LAZY, targetEntity = Grupo.class)
	@JoinTable(name = "nota_tem_grupo", joinColumns = { @JoinColumn(name = "idNota") }, inverseJoinColumns = {
			@JoinColumn(name = "idGrupo") })
	private List<Grupo> listaGrupos;

	public Integer getIdNota() {
		return idNota;
	}

	public void setIdNota(Integer idNota) {
		this.idNota = idNota;
	}

	public String getTlNota() {
		return tlNota;
	}

	public void setTlNota(String tlNota) {
		this.tlNota = tlNota;
	}

	public String getDeNota() {
		return deNota;
	}

	public void setDeNota(String deNota) {
		this.deNota = deNota;
	}

	public Date getDtCriNota() {
		return dtCriNota;
	}

	public void setDtCriNota(Date dtCriNota) {
		this.dtCriNota = dtCriNota;
	}

	public Date getDtAltNota() {
		return dtAltNota;
	}

	public void setDtAltNota(Date dtAltNota) {
		this.dtAltNota = dtAltNota;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public Byte[] getImagem() {
		return imagem;
	}

	public void setImagem(Byte[] imagem) {
		this.imagem = imagem;
	}

	public List<Grupo> getListaGrupos() {
		return listaGrupos;
	}

	public void setListaGrupos(List<Grupo> listaGrupos) {
		this.listaGrupos = listaGrupos;
	}

	public Integer getPosicao() {
		return posicao;
	}

	public void setPosicao(Integer posicao) {
		this.posicao = posicao;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cor == null) ? 0 : cor.hashCode());
		result = prime * result + ((deNota == null) ? 0 : deNota.hashCode());
		result = prime * result + ((dtAltNota == null) ? 0 : dtAltNota.hashCode());
		result = prime * result + ((dtCriNota == null) ? 0 : dtCriNota.hashCode());
		result = prime * result + ((idNota == null) ? 0 : idNota.hashCode());
		result = prime * result + Arrays.hashCode(imagem);
		result = prime * result + ((listaGrupos == null) ? 0 : listaGrupos.hashCode());
		result = prime * result + ((tlNota == null) ? 0 : tlNota.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Nota))
			return false;
		Nota other = (Nota) obj;
		if (cor == null) {
			if (other.cor != null)
				return false;
		} else if (!cor.equals(other.cor))
			return false;
		if (deNota == null) {
			if (other.deNota != null)
				return false;
		} else if (!deNota.equals(other.deNota))
			return false;
		if (dtAltNota == null) {
			if (other.dtAltNota != null)
				return false;
		} else if (!dtAltNota.equals(other.dtAltNota))
			return false;
		if (dtCriNota == null) {
			if (other.dtCriNota != null)
				return false;
		} else if (!dtCriNota.equals(other.dtCriNota))
			return false;
		if (idNota == null) {
			if (other.idNota != null)
				return false;
		} else if (!idNota.equals(other.idNota))
			return false;
		if (!Arrays.equals(imagem, other.imagem))
			return false;
		if (listaGrupos == null) {
			if (other.listaGrupos != null)
				return false;
		} else if (!listaGrupos.equals(other.listaGrupos))
			return false;
		if (tlNota == null) {
			if (other.tlNota != null)
				return false;
		} else if (!tlNota.equals(other.tlNota))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Nota [idNota=" + idNota + ", tlNota=" + tlNota + ", deNota=" + deNota + ", dtCriNota=" + dtCriNota
				+ ", dtAltNota=" + dtAltNota + ", cor=" + cor + ", imagem=" + Arrays.toString(imagem) + ", listaGrupos="
				+ listaGrupos + "]";
	}

}
